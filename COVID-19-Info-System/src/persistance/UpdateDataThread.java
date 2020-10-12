package persistance;

import java.util.Map;
import java.util.concurrent.TimeUnit;

public class UpdateDataThread extends ExecScript implements Runnable {
    private Thread t;

    public UpdateDataThread() {
        super("E:\\地理信息系统开发实习\\COVID19InfoSystem\\COVID-19-Info-System\\src\\data\\updateDataScriptPaths.json",
                "py");
    }

    @Override
    public void run() {
        int loopTime = 0;
        while (true) {
            StringBuilder sb = new StringBuilder("test init: ");
            System.out.println(sb.append(loopTime));
            Map<String, String> scriptResult = this.execScripts();
            for (Map.Entry<String, String> entry: scriptResult.entrySet()) {
                System.out.println(entry.getKey() + " says: " + entry.getValue());
            }
            try {
                TimeUnit.MINUTES.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            loopTime++;
        }
    }

    public void start() {
        if (t == null) {
            t = new Thread(this);
            t.start();
        }
    }
}
