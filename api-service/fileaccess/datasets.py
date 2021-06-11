
import os
import time

from utils import extract_environment_variable

DATASTORE_BUCKET = extract_environment_variable("DATASTORE_BUCKET")

def is_remote_store():
    if DATASTORE_BUCKET.startswith("gs:"):
        return True
    else:
        return False

def save_extract_dataset(file,dataset_id):
    file_path = os.path.join(DATASTORE_BUCKET,dataset_id)
    if not os.path.exists(file_path):
        os.makedirs(file_path)
    file_path = os.path.join(file_path,str(time.time())+".zip")
    # Save the file
    with open(file_path,'wb') as write_file:
        write_file.write(file)
    
    # Extract the zip file

    # Read all the extracted documents

        

