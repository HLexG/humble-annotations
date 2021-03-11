import nltk
import wikipedia
nltk.download('punkt')

imgFileList = ['jpg', 'png']

def wikiOut(query, numCandidates=1, candidateLength=3):
    candidateList = wikipedia.search(query)[:numCandidates]
    outputList= {}
    for i in candidateList:
        
        outputValues = {}
        
        try:
            outputValues['title'] = wikipedia.page(i).title,
        except:
            pass
        try:
            outputValues['summary'] = nltk.sent_tokenize(wikipedia.page(i).content)[:candidateLength],
        except:
            pass
        try:
            outputValues['url'] = wikipedia.page(i).url,
        except:
            pass
        try:
            outputValues['pageid'] = wikipedia.page(i).pageid
        except:
            pass
        try:
            imgList = wikipedia.page(i).images
            outputValues['imgid'] = next((x for x in imgList if x[-3:] in imgFileList), 'null')
        except:
            pass
        
        outputList[i] = outputValues
    return outputList

## Example Query
#  wikiOut('Barack',3)