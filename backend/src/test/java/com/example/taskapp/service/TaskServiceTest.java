package com.example.taskapp.service;

import com.example.taskapp.model.Task;
import com.example.taskapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;
import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
    @Mock
    TaskRepository repository;

    @InjectMocks
    TaskService service;

    @Test
    void addTask_shouldSaveAndReturnTask() {
        Task task = new Task("Buy groceries", "Milk, Bread");
        when(repository.save(task)).thenReturn(task);

        Task saved = service.addTask(task);
        assertEquals("Buy groceries", saved.getTitle());
        assertEquals("Milk, Bread", saved.getDescription());
    }

    @Test
    void getTasks_shouldReturnAllTasks() {
        Task t1 = new Task("Buy groceries", "Milk, Bread");
        Task t2 = new Task("Clean room", "Vacuum and dust");
        when(repository.findAll()).thenReturn(Arrays.asList(t1, t2));

        List<Task> tasks = service.getTasks();
        assertEquals(2, tasks.size());
    }
}
