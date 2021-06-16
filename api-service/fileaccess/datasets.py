
import os
import time
<<<<<<< HEAD
import zipfile
=======
>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0

from utils import extract_environment_variable

DATASTORE_BUCKET = extract_environment_variable("DATASTORE_BUCKET")

def is_remote_store():
    if DATASTORE_BUCKET.startswith("gs:"):
        return True
    else:
        return False

def save_extract_dataset(file,dataset_id):
<<<<<<< HEAD
    dataset_path = os.path.join(DATASTORE_BUCKET,dataset_id)
    if not os.path.exists(dataset_path):
        os.makedirs(dataset_path)
    file_path = os.path.join(dataset_path,str(time.time())+".zip")
=======
    file_path = os.path.join(DATASTORE_BUCKET,dataset_id)
    if not os.path.exists(file_path):
        os.makedirs(file_path)
    file_path = os.path.join(file_path,str(time.time())+".zip")
>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0
    # Save the file
    with open(file_path,'wb') as write_file:
        write_file.write(file)
    
    # Extract the zip file
<<<<<<< HEAD
    with zipfile.ZipFile(file_path) as zfile:
        # Get a list of all archived file names from the zip
       document_list = zfile.namelist()
       zfile.extractall(dataset_path)

    # Read all the extracted documents
    document_list = [os.path.join(dataset_path,path) for path in document_list]
    print(document_list)

    return document_list
=======

    # Read all the extracted documents

        

>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0
