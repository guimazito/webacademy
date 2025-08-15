import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def generate_synthetic_user_data(num_users=5000):
    np.random.seed(42)
    random.seed(42)

    user_ids = [f'user_{i:05d}' for i in range(num_users)]
    states = ['SP', 'MG', 'RJ', 'BA', 'PR', 'RS', 'SC', 'GO', 'DF', 'PE', 'CE', 'AM']
    # Definir probabilidades para ter uma distribuição mais realista
    probabilities = [0.25, 0.15, 0.15, 0.05, 0.1, 0.08, 0.07, 0.05, 0.05, 0.02, 0.02, 0.01]
    # Garantir que as probabilidades somem 1
    probabilities = [p / sum(probabilities) for p in probabilities]
    user_states = np.random.choice(states, num_users, p=probabilities)

    end_date = datetime.now()
    start_date = end_date - timedelta(days=2*365) # Últimos 2 anos
    registration_dates = [start_date + timedelta(days=random.randint(0, (end_date - start_date).days)) for _ in range(num_users)]
    registration_dates.sort() # Para simular uma ordem cronológica

    last_purchase_values = np.random.lognormal(mean=5.5, sigma=0.8, size=num_users)
    last_purchase_values = np.round(last_purchase_values, 2)
    # Ajustar valores extremos para serem mais realistas
    last_purchase_values[last_purchase_values > 1000] = 1000 + np.random.rand(np.sum(last_purchase_values > 1000)) * 500
    last_purchase_values[last_purchase_values < 10] = 10 + np.random.rand(np.sum(last_purchase_values < 10)) * 20

    df = pd.DataFrame({
        'user_id': user_ids,
        'estado': user_states,
        'data_cadastro': registration_dates,
        'valor_ultima_compra': last_purchase_values
    })
    df['data_cadastro'] = pd.to_datetime(df['data_cadastro']) # Garantir tipo datetime
    return df

# Gerar e salvar o arquivo CSV
usuarios_df = generate_synthetic_user_data(num_users=5000)
file_path = 'usuarios_limpo.csv'
usuarios_df.to_csv(file_path, index=False)
print(f"Arquivo '{file_path}' gerado com sucesso no diretório atual!")
print("Primeiras 5 linhas do DataFrame:")
print(usuarios_df.head())
print("\nInformações do DataFrame:")
print(usuarios_df.info())