import os
import re
import librosa
import numpy as np
import pandas as pd

# Parameters
linus_wav_folder = r'C:\Users\pette\OneDrive\Skrivbord\Kandidat\AI\liu-tnm119-projekt\MFCC\linus_data_wav\negative_linus_data_wav'
synthetic_folder = '.'
output_csv_path = 'not_pingpong_mfccs.csv'

# Collect all MFCCs here
mfcc_records = []

# --- Rename numeric files to pong_<number>.wav ---
for filename in os.listdir(linus_wav_folder):
    if os.path.isfile(os.path.join(linus_wav_folder, filename)):
        name, ext = os.path.splitext(filename)
        if re.fullmatch(r'\d+', name):
            new_name = f'pong_{name}{ext}'
            os.rename(
                os.path.join(linus_wav_folder, filename),
                os.path.join(linus_wav_folder, new_name)
            )

# --- Process Linus data (each file contains one bounce) ---
for filename in sorted(os.listdir(linus_wav_folder)):
    if filename.endswith('.wav'):
        file_path = os.path.join(linus_wav_folder, filename)
        try:
            y, sr = librosa.load(file_path, sr=None)

            # Extract MFCCs (13 x frames)
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)

            # Transpose to (frames x 13)
            mfcc = mfcc.T
            for vec in mfcc:
                record = {'file': filename}
                for i, val in enumerate(vec):
                    record[f'mfcc_{i+1}'] = val
                mfcc_records.append(record)

            print(f"Processed: {file_path}")

        except Exception as e:
            print(f"Error processing {file_path}: {e}")

# --- Optionally process synthetic data ---
for i in range(1, 5):
    file_name = f'synthetic_{i}.wav'
    file_path = os.path.join(synthetic_folder, file_name)
    if not os.path.isfile(file_path):
        continue

    try:
        y, sr = librosa.load(file_path, sr=None)

        # Extract MFCCs
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc = mfcc.T
        for vec in mfcc:
            record = {'file': file_name}
            for i, val in enumerate(vec):
                record[f'mfcc_{i+1}'] = val
            mfcc_records.append(record)

        print(f"Processed: {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# --- Save all MFCCs into one CSV ---
df_all = pd.DataFrame(mfcc_records)
df_all.to_csv(output_csv_path, index=False)
print(f"\n✅ All MFCCs saved to: {output_csv_path}")

