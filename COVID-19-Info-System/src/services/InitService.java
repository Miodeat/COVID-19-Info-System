package services;

import persistance.UpdateDataThread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitService implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextInitialized (ServletContextEvent contextEvent) {
        UpdateDataThread testT = new UpdateDataThread();
        testT.start();
    }
}
