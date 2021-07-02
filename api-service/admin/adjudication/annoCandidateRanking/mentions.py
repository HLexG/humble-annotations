

def get_mentions():
	# pull all unchecked mentions
	mention_pull =[]
	return mention_pull


def find_overlap():
	# Gather mentions
	# Group by overlap
	inputDict = {}
	# filter by sent, doc match
	# if overlap token spans, return
	overlapping_spans_dict ={}
	return overlapping_spans_dict

def get_conflicting_spans():
	# find opposite of above - where span is claimed by 2 diff clusters
	conflicted_clusters = []
	return conflicted_clusters

def get_uncontested_mentions():
	# return mentions w/o disagreement and >x iters 
	uncontested_mentions = []
	# send to a func to post to DB
	return uncontested_mentions


def get_annotators():
	# get mentions and annotators
	# pull annotators skill level if in mentions
	annotator_mention_skill_level_list =[]
	return annotator_mention_skill_level_list


def score_mentions():
	# get annotator_mention_skill_level_list
	# get overlapping_spans_dict
	# rank overlaps
	# get conflicted_clusters
	# rank conflicts
	# return scores to be posted to DB
	conflicted_mention_scores = []
	return conflicted_mention_scores



