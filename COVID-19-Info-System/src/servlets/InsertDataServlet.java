package servlets;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import services.epidemicService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "InsertDataServlet")
public class InsertDataServlet extends HttpServlet {
    private epidemicService epidemic_Service;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        epidemic_Service = new epidemicService();
        JSONObject res = new JSONObject();
        BufferedReader reader = new BufferedReader(new FileReader("D:\\lastedDayDate.csv"));
        String line = null;
        int index =0;
        String dbName = "basicdb";
        String sql = "insert into epidemic_data(province,country,lon,lat,update_time,confirmed,death,recovered)" +
                "values(?,?,?,?,?,?,?,?)";
        JSONObject data = new JSONObject();
        JSONArray array = new JSONArray();
        while ((line=reader.readLine())!=null){
            String temps[] = line.split(",");
            if (temps.length==8) {
                data.put("1-1", temps[0]);
                data.put("2-1", temps[1]);
                data.put("3-7", Float.valueOf(temps[2]));
                data.put("4-7", Float.valueOf(temps[2]));
                data.put("5-4", temps[4]);

                data.put("6-0", Float.valueOf(temps[5]).intValue());

                data.put("7-0",Float.valueOf(temps[6]).intValue());
                data.put("8-0", Float.valueOf(temps[7]).intValue());
                array.add(data);
                data.clear();
            }
        }
        res = epidemic_Service.insertEpidemicDataService(array, sql, dbName);

        out.write(res.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
