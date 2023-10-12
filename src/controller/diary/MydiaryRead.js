import pool from "../../config/database.js";
import { readDiary } from "../../dao/diary/diaryDao.js";
import { readUser } from "../../dao/auth/userDao.js";

const MydiaryRead = async (req, res) => {

    try {
        const conn = await pool.getConnection();
        // 아이디에 맞는 rid 찾기 위해 readUser 불러오기
        const [user] = await readUser(conn, req.body.id);
        const [diarycontent] = await readDiary(conn, user[0].rid);

        if(diarycontent.length!=0) {
            console.log(diarycontent);
            res.status(200).send({
                ok: true,
                message: 'Diary Reading complete',  
            })
        } 
        else res.send("일기가 존재하지 않습니다.");
        conn.release();
        
    } catch (error) {
        console.log("error: ", error);
        res.send({
            ok: false,
            message: error.message
        });
    }
}

export default MydiaryRead;