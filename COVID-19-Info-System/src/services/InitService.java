package services;

import persistance.UpdateEpDataThread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitService implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextInitialized (ServletContextEvent contextEvent) {
        UpdateEpDataThread testT = new UpdateEpDataThread();
        testT.start();
    }
}
