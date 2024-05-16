package app.web;

import app.entities.Student;
import app.repositories.PaymentRepository;
import app.repositories.StudentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class StudentRestController {

    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public StudentRestController(PaymentRepository paymentRepository, StudentRepository studentRepository){
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/students")
    public List<Student> getAll(){
        return studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getByCode(@PathVariable String code){
        return this.studentRepository.findByCode(code);
    }

    @GetMapping("/students/program/{id}")
    public List<Student> getStudentsByProgramId(@PathVariable String id){
        return this.studentRepository.findByProgramId(id);
    }

}
