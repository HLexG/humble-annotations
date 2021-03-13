import threading
from queue import Queue

import pandas as pd

from dataaccess import entitylink

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
    # dataset = await datasets.get(dataset_id)

    # Load csv file with entity linking database
    df = pd.read_csv('data/entities.csv')

    # Delete all rows from entitylinks
    entitylink.delete_all(dataset_id)

    # Create entitylinks
    for row in df.iterrows():
        print(row)
        x = await entitylink.create(alt_id=row[1]['wiki_id'],
                                    dataset_id=dataset_id,
                                    entity_name=row[1]['name'],
                                    description=row[1]['description'],
                                    url=row[1]['url'],
                                    id=row[1]['qid'])





    """
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
    """
    
    print("Complete....")

