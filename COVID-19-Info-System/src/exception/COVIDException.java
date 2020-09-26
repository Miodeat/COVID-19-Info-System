package exception;

public class COVIDException extends RuntimeException {
    public static final long serialVersion =1L;
    public COVIDException(Object obj){
        //调用StatusObject中重写了的toString()方法
        super(obj.toString());
    }
}

