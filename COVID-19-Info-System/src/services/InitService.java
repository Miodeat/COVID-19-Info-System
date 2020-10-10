package services;

import persistance.TestThread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class InitService implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }

    @Override
    public void contextInitialized (ServletContextEvent contextEvent) {
        TestThread testT = new TestThread();
        testT.start();
    }
}
