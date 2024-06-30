
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
USE LIBRARY_MANAGEMENT;
SET GLOBAL log_bin_trust_function_creators = 1;
DELIMITER //
CREATE TRIGGER update_available_books 
AFTER INSERT ON ISSUED 
FOR EACH ROW 
BEGIN
    UPDATE BOOKS
    SET AVAILABLE_QTY = AVAILABLE_QTY - 1
    WHERE BOOKS.BOOK_ID = NEW.BOOK_ID;
END;
//
DELIMITER ;

//
CREATE TRIGGER update_available_books_on_return
AFTER INSERT ON RETURNED
FOR EACH ROW
BEGIN
    UPDATE BOOKS
    SET AVAILABLE_QTY = AVAILABLE_QTY + 1
    WHERE BOOKS.BOOK_ID = NEW.BOOK_ID;
END;
//
DELIMITER ;

DELIMITER //

CREATE PROCEDURE IssueFine(IN return_id INT)
BEGIN
    DECLARE fine_amount DECIMAL(10, 2);
    DECLARE days_late INT;
    SELECT DATEDIFF(NOW(), return_date) INTO days_late
    FROM Returns
    WHERE return_id = return_id;

    IF days_late > 0 THEN
        SET fine_amount = days_late * 10;
        INSERT INTO Fines (return_id,user_id, fine_amount, reason)
        VALUES (return_id,user_id, fine_amount, 'Late Return');
    END IF;
END //