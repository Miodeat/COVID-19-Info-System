package servlets;

import net.sf.json.JSONObject;
import services.epidemicService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Time;

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
        String dbName = "basicdb";
        //下面的为一个test
        String sql = "insert into epidemic_data(province,country,lon,lat,update_time,confirmed,death,recovered)" +
                "values(?,?,?,?,?,?,?,?)";
        JSONObject data = new JSONObject();
        data.put("1-1","Anhui");
        data.put("2-1","China");
        data.put("3-7",33.4);
        data.put("4-7",112);
        data.put("5-4","2020-10-01");
        data.put("6-0",2123);
        data.put("7-0",200);
        data.put("8-0",20);
        res = epidemic_Service.insertEpidemicDataService(data,sql,dbName);

        out.write(res.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
