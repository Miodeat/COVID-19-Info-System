package servlets;

import net.sf.json.JSONObject;
import services.collectiveRationalityService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "getCollectiveRationalityInfoServlet")
public class getCollectiveRationalityInfoServlet extends HttpServlet {
    private collectiveRationalityService collectiveRationality_Service ;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("content-type", "text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        collectiveRationality_Service = new collectiveRationalityService();
        String Sql = "select country,update_time,rationality,from_time,to_time from collective_rationality ";
        String dbName = "collectiverationaldb";
        JSONObject res = collectiveRationality_Service.getCollectiveRationalityInfo(Sql,dbName);
        System.out.println(res);
        out.write(res.toString());

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
