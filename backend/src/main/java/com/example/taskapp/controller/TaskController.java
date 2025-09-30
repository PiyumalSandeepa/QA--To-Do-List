package com.example.taskapp.controller;

import com.example.taskapp.model.Task;
import com.example.taskapp.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task saved = service.addTask(task);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Task> getTasks() {
        return service.getTasks();
    }
}
