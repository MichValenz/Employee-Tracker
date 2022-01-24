INSERT INTO department (name)
VALUES
('Quality Assurance'),
('Policy and Procedures'),
('Call Center');


INSERT INTO role (title, salary, department_id)
VALUES
('Quality Manager', 55000, 1),
('Quality Specialist', 3000, 1),
('Policy Manager', 40000, 2),
('Policy Writer', 38000, 2),
('Call Center Manager', 36000, 3),
('Call Center CSR', 28000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Apples', 1, NULL),
('Sarah', 'Key', 2, 1),
('Carlos', 'Rodriuez', 3, 1),
('Susana', 'Lopez', 4, 3),
('Linda', 'Flores', 5, NULL),
('Cade', 'Jones', 6, 5);