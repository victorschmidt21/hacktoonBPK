import User from "../models/UserModel";
import QueryReturn from "./QueryReturn";
import CommentModel from "../models/CommentModel";

class QueryUtils {
  public UserInsertGenerate(user: User): QueryReturn {
    const userName = user.getName()?.trim();
    const userEmail = user.getEmail()?.trim();
    const userPassword = user.getPassword()?.trim();
    const pathImageProfile = user.geturl_img_user()?.trim();
    const type = user.getType()?.trim();

    if (!userName) throw new Error("Invalid name.");
    if (!userEmail) throw new Error("Invalid email.");
    if (!userPassword) throw new Error("Invalid password.");
    if (!pathImageProfile) throw new Error("Invalid image.");
    if (!type) throw new Error("Invalid type.");

    const columns = ["userName", "userEmail", "userPassword", "url_img_user", "type"];
    const placeholders = columns.map(() => "?").join(", ");
    const sql = `INSERT INTO tb_user (${columns.join(", ")}) VALUES (${placeholders});`;
    const parameters = [userName, userEmail, userPassword, pathImageProfile, type];

    return new QueryReturn(sql, parameters);
  }
  public CommentInsertGenerate(comment: CommentModel): QueryReturn {
    const articleId = comment.getArticleId()?.trim();
    const text = comment.getText()?.trim();
    const userId = comment.getUserId()?.trim();
  
    if (!articleId) throw new Error("Invalid article ID.");
    if (!text) throw new Error("Invalid comment text.");
    if (!userId) throw new Error("Invalid user ID.");
  
    const columns = ["article_id", "comentario", "user_id", "created_at", "updated_at"];
    const placeholders = ["?", "?", "?", "NOW()", "NOW()"];
  
    const sql = `INSERT INTO tb_comentarios (${columns.join(", ")}) VALUES (${placeholders.join(", ")});`;
    const parameters = [articleId, text, userId];
  
    return new QueryReturn(sql, parameters);
  }
  

}

export default QueryUtils;
