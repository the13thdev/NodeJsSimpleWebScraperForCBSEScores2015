//Importing modules
var http = require('http');
var https = require('https');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Limiting maximum number of concurent sockets
http.globalAgent.maxSockets=20;
https.globalAgent.maxSockets=20;

//Data Variables
var urlWeb="http://resultsarchives.nic.in/cbseresults/cbseresults2015/class12/cbse122015_all.asp";
var urlRef="http://resultsarchives.nic.in/cbseresults/cbseresults2015/class12/cbse122015_all.htm";
var startRollNo=1717965, endRollNo=1719500;
var success,fails;

console.log("Sever Running!");

//-1 denotes int value not specified for field.
function modifyToValidInt(x){
  if(isNaN(x))
  return -1;
  else
  return x;
};

function fetchScores(rollNo){

  request.post({ url: urlWeb, headers: {'Referer':urlRef}, form:{regno: rollNo}}, function(error, response, body){

    if(!error && response.statusCode==200){
      //Data Successfully loaded
      //feeding body through cheerio
      var $ = cheerio.load(body);

      //Checking if Roll no is valid
      if($('[bgcolor="mediumblue"]').length){

        ++success;
        console.log("fetching "+rollNo+" [success="+success+"]"+" [fails="+fails+"]..");
        var i,j,name,rows,fields,dataStr;
        name = $('td>font[face="Arial"][size=2]>b').text();
        rows = $('table[border=1][cellpadding="2"][cellspacing="0"][width="75%"][bordercolor="#000000"] tr');
        for(i=1;i<rows.length;++i)
        {
          if(rows.eq(i).children('td').length===6)
          {
            fields=rows.eq(i).children('td');
            dataStr=""+rollNo+","+name+",";
            dataStr+=modifyToValidInt(parseInt(fields.eq(0).text()))+",";
            dataStr+=fields.eq(1).text()+",";
            for(j=2;j<=4;++j)
            {
              dataStr+=modifyToValidInt(parseInt(fields.eq(j).text()))+",";
            }
            dataStr+=fields.eq(5).text()+"\n";
            //console.log(dataStr);
            fs.appendFile('data'+startRollNo+'to'+endRollNo+'.csv',dataStr,function(err){
              if(err)
              console.log(err);
            });
          }
        }
      }
      else{
        ++fails;
        console.log("Invalid RollNo "+ rollNo);
      }
    }  else{
      //Data could not be loadedD:
      ++fails;
      console.log("Could not fetch "+rollNo+" [success="+success+"]"+"[fails="+fails+"]..");
      console.log(error);
    }
  });
};

function execute(){
  var i;
  success=0,fails=0;
  for(i=startRollNo;i<=endRollNo;++i)
  {
    fetchScores(i);
  }
};

execute();
