package servlets;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import services.epidemicService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet(name = "getEpidemicTimeSeriesServlet")
public class getEpidemicTimeSeriesServlet extends HttpServlet {
    private epidemicService epidemic_Service;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        epidemic_Service = new epidemicService();
        String country = request.getParameter("country");
//        String country = "China";
        String sql = "select country,update_time, sum(confirmed) as confirmed,sum(death) as death,sum(recovered) as recovered " +
                "from epidemic_data group by country,update_time " +
                "having country like '" +country+"'"+
                "order by update_time desc ";
//        String sql = "select country,sum(confirmed) as confirmed,sum(death) as death, sum(recovered) as recovered,update_time " +
//                "from epidemic_data group by country,update_time order by update_time desc";
        String dbName = "basicdb";
        JSONObject res = new JSONObject();
//        res = epidemic_Service.getEpidemicInfoService(sql,dbName);
        res.put("timeSeries",getTimeSeries(
                epidemic_Service.getEpidemicInfoService(sql,dbName))) ;
        System.out.println(res);
        out.write(res.toString());

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    JSONObject getTimeSeries(JSONObject data){

        JSONObject res = new JSONObject();
        HashMap<String,String> timeKey = new HashMap<>();
        JSONArray array = data.getJSONArray("res");
        JSONArray resArray = new JSONArray();
        JSONObject res2 = new JSONObject();
        JSONObject res3 = new JSONObject();
        String time = "";
        String last_time = "";
        String country = "";
        int confirmed = 0;
        int death = 0;
        int recovered = 0;
        for(int i = 0;i<array.size();i++){
            JSONObject temp = array.getJSONObject(i);
            confirmed = Integer.parseInt(temp.getString("confirmed"));
            death = Integer.parseInt(temp.getString("death"));
            recovered = Integer.parseInt(temp.getString("recovered"));
            time = temp.getString("update_time");
            country = temp.getString("country");
            if(timeKey.containsKey(time)){
                res3.put("confirmed",confirmed);
                res3.put("death",death);
                res3.put("recovered",recovered);
                res2.put(country,res3);
                if(i==array.size()-1){
                    res.put(last_time,res2);
                }
            }else{
                timeKey.put(time,time);
                res.put(last_time,res2);
                res2.clear();
                res3.put("confirmed",confirmed);
                res3.put("death",death);
                res3.put("recovered",recovered);
                res2.put(country,res3);
            }
            last_time = time;
        }
        res.discard("");
        return res;
    }
}
