//import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
public class main{
    calculation c = new calculation("Sami",23);
    public static void main(String[] args){
        main m = new main();
        System.out.println("Hello");
        System.out.println(m.c.name + " | " + m.c.age);
        String json = gson.toJson(m.c);

        //ObjectMapper mapper = new ObjectMapper();

        

    }
}       