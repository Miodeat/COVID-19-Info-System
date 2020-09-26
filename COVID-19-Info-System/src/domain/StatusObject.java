package domain;

public enum StatusObject {

    NULL_OBJ("LUO001","对象为空"),
    ERROR_ADD_USER("LUO002","添加用户失败"),
    UNKNOWN_ERROR("LUO999","系统繁忙，请稍后再试....");

    //状态码
    private String code;
    //状态信息
    private String msg;

    private StatusObject(String msg, String code) {
        this.setCode(code);
        this.setMsg(msg);
    }

    public void setCode(String code) {
        this.code = code;
    }
    public String getCode(){
        return code;
    }

    public void setMsg(String msg){
        this.msg = msg;
    }
    public String getMsg(){
        return msg;
    }

    @Override
    public String toString(){
        return "["+this.code+"]"+this.msg;
    }
}
