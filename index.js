const pg = require('pg');

const client = new pg.Client({
    user: 'user8',
    host: '192.168.0.207',
    database: 'user8_db',
    password: 'JBKVZDPK',
    port: 5432,
});

//definiujemy funkcję asynchroniczną, która pobiera dane z bazy danych
const getFromDb = async () => {
    
    //wyślij kwerendę - znowu używamy await, aby poczekać na wynik
    const result = await client.query('SELECT * FROM grades');
    //wyświetl surowy result w konsoli
    console.log(result.rows);
    //wyświetl wynik zapytania w konsoli
    console.table(result.rows);
    
}
const insertToDb = async (student_id, course_id, grade) => {
    const result = await client.query('INSERT INTO grades(student_id, course_id, grade) VALUES($1, $2, $3)', 
                                            [student_id, course_id, grade]);
    console.log(result);
}

const main = async () => {
    await client.connect();
    await insertToDb(1,1,5);
    await getFromDb();
    await client.end();
}

main();