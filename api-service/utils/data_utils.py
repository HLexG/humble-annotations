
import threading
from queue import Queue

from dataaccess import datasets, documents

thread_count = 50
threads = []
# Initial queue
queue = Queue(0)

class ProcessorThread(threading.Thread):
    def __init__(self, queue, thread):
        threading.Thread.__init__(self)
        self.queue = queue
        self.thread = thread

    def run(self):
        while self.queue.empty() == False:
            item = self.queue.get()

            download_from_wiki(item["url"], item["img_dir"], item["file_path"])

            self.queue.task_done()

def download_from_wiki(url,img_dir,file_path):
    try:
        ...
        print(url,img_dir,file_path)
        # img_path = os.path.basename(url)
        # with requests.get(url, stream=True) as r:
        #     r.raise_for_status()
        #     with open(file_path, 'wb') as f:
        #         for chunk in r.iter_content(chunk_size=8192):
        #             f.write(chunk)
    except Exception as e:
        print("Error in url:", url)
        print(e)

async def load_entity_links(dataset_id):
    print("Loading Entity Links...")

    # Dataset
    dataset = await datasets.get(dataset_id)

    # Read documents for dataset_id
    #documents = await documents.browse(dataset_id=dataset_id)

    # For each document parse text and find entities

    # Find suggestive entity links for each entities

    # Delete all rows from entitylinks

    # Create entitylinks


    count = 0
    for url in range(75):
        print(url)
        count += 1
        queue.put({"url": url, "img_dir": 2,"file_path":3})

    # Execute downloads from queue in a thread
    for i in range(thread_count):
        thread = ProcessorThread(queue, i)
        thread.start()
        threads.append(thread)
    for thread in threads:
        thread.join()
    
    print("Complete....")
    
