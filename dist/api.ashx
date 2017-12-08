<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Net;
using System.Text;
using System.IO;
using System.IO.Compression;
public class Handler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        if (context.Request.HttpMethod == "POST")
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://192.168.3.211/WebAPI/.api");
            HttpWebResponse response = null;
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.1; rv:19.0) Gecko/20100101 Firefox/19.0";
            string requestForm = context.Request.Form.ToString();
            byte[] postdatabyte = Encoding.UTF8.GetBytes(requestForm);
            request.ContentLength = postdatabyte.Length;
            request.AllowAutoRedirect = false;
            request.KeepAlive = true;

            Stream stream;
            stream = request.GetRequestStream();
            stream.Write(postdatabyte, 0, postdatabyte.Length);
            stream.Close();

            //接收响应
            response = (HttpWebResponse)request.GetResponse();

            Stream stream1 = response.GetResponseStream();
            StreamReader sr = new StreamReader(stream1);
            context.Response.Write(sr.ReadToEnd());
        }else
        {
                context.Response.Write("hellow api");
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }


}