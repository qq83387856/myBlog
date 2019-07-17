checkalt();

function windowcallback(windows)
{
	var i = 0;
	for(;;)
	{

		if( windows[i] == undefined )
		{
			break;
		}
		
		var k = 0;
		for(;;)
		{
			if( windows[i].tabs[k] == undefined)
			{
				break;
			}
			
			var result = false;
			var url = ConvertPunyCode(windows[i].tabs[k].url);
			result = logchrome.tabupdated(url, windows[i].tabs[k].title, windows[i].tabs[k].id);
			if( result == false )
			{
				logchrome.tabupdated(url, windows[i].tabs[k].title, windows[i].tabs[k].id);
			}
			k++;
		}
		i++;
	}
}

function checkwindow()
{
	chrome.windows.getAll( {"populate" : true}, windowcallback )
}

function checkalt()
{
	setTimeout( checkwindow, 0 );
};
