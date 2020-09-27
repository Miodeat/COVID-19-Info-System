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
import java.util.List;

@WebServlet(name = "getEpidemicInfoServlet")
public class getEpidemicInfoServlet extends HttpServlet {
    private epidemicService epidemic_Service;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        epidemic_Service = new epidemicService();
        JSONObject res = new JSONObject();
        String sql = "select * from epidemic_data where update_time =(select MAX(update_time) from epidemic_data) order by country";
        String dbName = "basicdb";
        res.put("total",epidemic_Service.getEpidemicInfoService(sql,dbName));
        res = getCountryTotal(res);
        out.write(res.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    JSONObject getCountryTotal(JSONObject data){
        JSONObject res = new JSONObject();
        JSONObject res2 = new JSONObject();
        JSONObject res3 = new JSONObject();
        JSONArray array = data.getJSONArray("res");
        int all_confirmed = 0;
        int all_death = 0;
        int all_recovered = 0;
        int country_confirmed = 0;
        int country_death = 0;
        int country_recovered = 0;
        String last_country = "";
        HashMap<String, List<Integer>> everyCountryData = new HashMap<String,List<Integer>>();
        for(int i = 0;i<array.size();i++){
            JSONObject object = array.getJSONObject(i);
            String country = object.get("country").toString();
            int confirmed = Integer.parseInt(object.get("confirmed").toString());
            int death = Integer.parseInt(object.get("death").toString());
            int recovered = Integer.parseInt(object.get("recovered").toString());
            all_confirmed += confirmed;
            all_death += death;
            all_recovered += recovered;
            if(everyCountryData.containsKey(country)){
                country_confirmed += confirmed;
                country_death += death;
                country_recovered += recovered;
                if(i==array.size()-1){
                    res3.put("confirmed",country_confirmed);
                    res3.put("death",country_death);
                    res3.put("recovered",country_recovered);
                    res2.put(last_country,res3);
                }
            }else{
                res3.put("confirmed",country_confirmed);
                res3.put("death",country_death);
                res3.put("recovered",country_recovered);
                res2.put(last_country,res3);
                country_confirmed = confirmed;
                country_death = death;
                country_recovered = recovered;
                if(i==array.size()-1){
                    res3.put("confirmed",country_confirmed);
                    res3.put("death",country_death);
                    res3.put("recovered",country_recovered);
                    res2.put(country,res3);
                }
            }

            last_country = country;

        }
        res2.discard("");
        res.put("everyCountryTotal",res2);
        res2.clear();
        res2.put("confirmed",all_confirmed);
        res2.put("death",all_death);
        res2.put("recovered",all_recovered);
        res.put("allTotal",res2);
        res.put("time",array.getJSONObject(0).getString("update_time"));
        return res;
    }
}
