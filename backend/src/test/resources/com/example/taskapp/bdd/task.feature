Feature: Task Management

  Scenario: Add a new task
    Given I have a task with title "Buy groceries" and description "Milk, Bread"
    When I add the task
    Then the task should be saved successfully

  Scenario: Retrieve all tasks
    Given tasks exist
    When I request all tasks
    Then I should receive a list of tasks with title and description
