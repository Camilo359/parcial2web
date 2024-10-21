string url = @"http://https://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=72469a6e&app_key=03bdc79e83940aaaccd19f4c722f49aa";
            WebRequest webRequest = WebRequest.Create(url);
            HttpWebResponse httpWebResponse = null;
            httpWebResponse = (HttpWebResponse)webRequest.GetResponse();

            string result = string.Empty;
            using(Stream stream = httpWebResponse.GetResponseStream())
            {
                StreamReader streamReader = new StreamReader(stream);
                result = streamReader.ReadToEnd();
                streamReader.Close();
            }