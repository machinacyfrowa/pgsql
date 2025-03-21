const pg = require('pg'); // Importujemy bibliotekę 'pg', która umożliwia komunikację z bazą danych PostgreSQL

// Tworzymy nowego klienta PostgreSQL z odpowiednimi parametrami połączenia
const client = new pg.Client({
    user: 'user8', // Nazwa użytkownika bazy danych
    host: '192.168.0.207', // Adres hosta bazy danych
    database: 'user8_db', // Nazwa bazy danych
    password: 'JBKVZDPK', // Hasło użytkownika bazy danych
    port: 5432, // Port, na którym działa serwer PostgreSQL
});

// Definiujemy funkcję asynchroniczną, która pobiera dane z tabeli 'grades' w bazie danych
const getFromDb = async () => {
    // Wyślij zapytanie SQL do bazy danych, aby pobrać wszystkie wiersze z tabeli 'grades'
    // Używamy 'await', aby poczekać na zakończenie operacji
    const result = await client.query('SELECT * FROM grades');
    
    // Wyświetl surowe dane (wiersze) zwrócone przez zapytanie w konsoli
    console.log(result.rows);
    
    // Wyświetl dane w formie tabeli w konsoli, co ułatwia ich czytanie
    console.table(result.rows);
}

// Definiujemy funkcję asynchroniczną, która wstawia nowy rekord do tabeli 'grades'
const insertToDb = async (student_id, course_id, grade) => {
    // Wyślij zapytanie SQL do bazy danych, aby wstawić nowy rekord
    // Używamy parametrów ($1, $2, $3) w zapytaniu, aby uniknąć podatności na SQL Injection
    const result = await client.query(
        'INSERT INTO grades(student_id, course_id, grade) VALUES($1, $2, $3)', 
        [student_id, course_id, grade] // Przekazujemy wartości do zapytania
    );
    
    // Wyświetl wynik operacji w konsoli (np. informacje o wstawionym rekordzie)
    console.log(result);
}

// Definiujemy główną funkcję programu, która zarządza połączeniem z bazą danych i wywołuje inne funkcje
const main = async () => {
    // Nawiązujemy połączenie z bazą danych
    await client.connect();
    
    // Wywołujemy funkcję, aby wstawić nowy rekord do tabeli 'grades'
    // W tym przypadku wstawiamy rekord z wartościami: student_id = 1, course_id = 1, grade = 5
    await insertToDb(1, 1, 5);
    
    // Wywołujemy funkcję, aby pobrać i wyświetlić dane z tabeli 'grades'
    await getFromDb();
    
    // Zakończ połączenie z bazą danych
    await client.end();
}

// Wywołujemy funkcję główną, aby uruchomić program
main();