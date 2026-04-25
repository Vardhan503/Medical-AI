import duckdb
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "data/medicaid-provider-spending.duckdb")

class DataEngine:
    def __init__(self):
        self.con = duckdb.connect(DB_PATH, read_only=True)

    def get_provider_stats(self, npi: str):
        """Get total spending and volume for a specific provider NPI."""
        query = f"""
        SELECT 
            HCPCS_CODE,
            SUM(TOTAL_PAID) as total_paid,
            SUM(TOTAL_CLAIM_LINES) as total_claims,
            SUM(TOTAL_PATIENTS) as total_patients
        FROM dataset
        WHERE BILLING_PROVIDER_NPI_NUM = '{npi}' OR SERVICING_PROVIDER_NPI_NUM = '{npi}'
        GROUP BY HCPCS_CODE
        ORDER BY total_paid DESC
        """
        return self.con.execute(query).fetchall()

    def get_anomaly_stats(self, npi: str, hcpcs: str):
        """Compare a provider's spending for a code against national averages."""
        query = f"""
        WITH provider_stats AS (
            SELECT 
                AVG(TOTAL_PAID / TOTAL_CLAIM_LINES) as avg_paid_per_line,
                SUM(TOTAL_CLAIM_LINES) as total_lines
            FROM dataset
            WHERE (BILLING_PROVIDER_NPI_NUM = '{npi}' OR SERVICING_PROVIDER_NPI_NUM = '{npi}')
            AND HCPCS_CODE = '{hcpcs}'
        ),
        national_stats AS (
            SELECT 
                AVG(TOTAL_PAID / TOTAL_CLAIM_LINES) as national_avg_paid_per_line,
                STDDEV(TOTAL_PAID / TOTAL_CLAIM_LINES) as national_stddev_paid_per_line
            FROM dataset
            WHERE HCPCS_CODE = '{hcpcs}'
        )
        SELECT 
            p.avg_paid_per_line,
            n.national_avg_paid_per_line,
            n.national_stddev_paid_per_line,
            (p.avg_paid_per_line - n.national_avg_paid_per_line) / NULLIF(n.national_stddev_paid_per_line, 0) as z_score
        FROM provider_stats p, national_stats n
        """
        return self.con.execute(query).fetchone()

data_engine = DataEngine()
