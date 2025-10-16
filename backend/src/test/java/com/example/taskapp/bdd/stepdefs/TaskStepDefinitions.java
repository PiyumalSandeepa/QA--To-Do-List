package com.example.taskapp.bdd.stepdefs;

import com.example.taskapp.model.Task;
import com.example.taskapp.service.TaskService;
import io.cucumber.java.en.*;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@CucumberContextConfiguration
@SpringBootTest
public class TaskStepDefinitions {

    @Autowired
    private TaskService service;

    private Task task;
    private List<Task> tasks;

    @Given("I have a task with title {string} and description {string}")
    public void i_have_a_task(String title, String description) {
        task = new Task(title, description);
    }

    @When("I add the task")
    public void i_add_the_task() {
        task = service.addTask(task);
    }

    @Then("the task should be saved successfully")
    public void task_saved_successfully() {
        assertNotNull(task.getId());
    }

    @Given("tasks exist")
    public void tasks_exist() {
        service.addTask(new Task("Buy groceries", "Milk, Bread"));
        service.addTask(new Task("Clean room", "Vacuum"));
    }

    @When("I request all tasks")
    public void i_request_all_tasks() {
        tasks = service.getTasks();
    }

    @Then("I should receive a list of tasks with title and description")
    public void receive_list_of_tasks() {
        assertTrue(tasks.size() >= 2);
        assertNotNull(tasks.get(0).getTitle());
        assertNotNull(tasks.get(0).getDescription());
    }
}
