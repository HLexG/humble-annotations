import nltk
import threading
import wikipedia
from queue import Queue
from wikimapper import WikiMapper

imgFileList = ['jpg', 'png']


def wikiOut(query, numCandidates=1):
    candidateList = wikipedia.search(query)[:numCandidates]
    outputList = {}
    for i in candidateList:

        outputValues = {}

        try:
            page = wikipedia.page(i)
            outputValues['title'] = page.title
            outputValues['summary'] = nltk.sent_tokenize(page.content)[0]
            outputValues['url'] = page.url
            outputValues['pageid'] = page.pageid
            imgList = page.images
            outputValues['imgid'] = next((x for x in imgList if x[-3:] in imgFileList), 'null')
        except:
            pass

        outputList[i] = outputValues
    return outputList


def merge_dicts(*dict_args):
    result = {}
    for dictionary in dict_args:
        result.update(dictionary)
    return result


class WikipediaThread(threading.Thread):
    def __init__(self, queue, thread):
        threading.Thread.__init__(self)
        self.queue = queue
        self.thread = thread
        self.items_list = []

    def run(self):
        while self.queue.empty() == False:
            item = self.queue.get()

            out = wikiOut(item['entity'], 3)
            items = {}
            items['entity'] = item['entity']
            items['alias'] = list(out.keys())
            items['raw'] = out

            self.items_list.append(items)

            self.queue.task_done()


def scrape_wikipedia_entities(entities, thread_count=50):
    thread_count = thread_count
    threads = []
    # Initial queue
    queue = Queue(0)

    items_list = []

    for entity in entities:
        queue.put({"entity": entity})

    # Execute downloads from queue in a thread
    for i in range(thread_count):
        thread = WikipediaThread(queue, i)
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()
        items_list += thread.items_list

    wikidump = merge_dicts(*[item['raw'] for item in items_list])
    alias_dict = {item['entity']: item['alias'] for item in items_list}

    return wikidump, alias_dict


def get_wikimapper():

    return WikiMapper("index_enwiki-latest.db")