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

@WebServlet(name = "getTreeDataServlet")
public class getTreeDataServlet extends HttpServlet {
    private epidemicService epidemic_Service ;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        epidemic_Service = new epidemicService();
        JSONObject res = new JSONObject();
        String sql = "select country,update_time,sum(confirmed) as confirmed,sum(death) as death," +
                "sum(recovered) as recovered \n" +
                "from epidemic_data group by country,update_time order by update_time desc limit 188";
        String dbName = "basicdb";
        res = epidemic_Service.getEpidemicInfoService(sql,dbName);
        out.write(res.toString());
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
