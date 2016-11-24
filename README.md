# NodeJsSimpleWebScraperForCBSEScores2015
A Scraper created to fetch CBSE Board Examination Results for 2015 from the then CBSE Website.

It fetched data from "http://resultsarchives.nic.in/cbseresults/cbseresults2015/class12/cbse122015_all.asp" and stored them into a .csv file.

The starting and ending roll numbers of the range for which scores need to be fetched must be mentioned in the startRollNo and endRollNo fields in server.js file.

It is recommended to run the script for smaller ranges of roll numbers (ex: startRollNo=1610001, endRollNo=1615000). 

Usually only about 90 percent of the valid roll numbers in the mentioned range are fetched. The rest that are not successfuly fetched are not mentioned in the .csv file.
