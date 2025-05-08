import db from "../database/database";
import QueryReturn from "../Utils/QueryReturn";
import QueryUtils from "../Utils/QueryUtils";
import ArticlesModel from "../models/ArticlesModel";
import { Request, Response } from "express";

export default class ArticlesRepository {

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query("SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, a.tematic_area, a.version, a.key_words, COALESCE(JSON_ARRAYAGG(JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)), JSON_ARRAY()) AS colaborators FROM tb_artigo a LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id LEFT JOIN tb_user u ON u.idUser = c.user_id GROUP BY a.article_id ORDER BY a.created_at DESC;");
            res.status(200).send(result[0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async getByUser(userId: number, req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query(`
                SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, 
                a.tematic_area, a.version, a.key_words, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)
                ), JSON_ARRAY()) AS colaborators 
                FROM tb_artigo a 
                LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id 
                LEFT JOIN tb_user u ON u.idUser = c.user_id 
                WHERE a.creator_id = ? OR u.idUser = ?
                GROUP BY a.article_id 
                ORDER BY a.created_at DESC;`, 
                [userId, userId]
            );
            res.status(200).send(result[0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async getByEvent(eventId: number, req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query(`
                SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, 
                a.tematic_area, a.version, a.key_words, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)
                ), JSON_ARRAY()) AS colaborators 
                FROM tb_artigo a 
                LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id 
                LEFT JOIN tb_user u ON u.idUser = c.user_id 
                WHERE a.evento_id = ?
                GROUP BY a.article_id 
                ORDER BY a.created_at DESC;`, 
                [eventId]
            );
            res.status(200).send(result[0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async getByUserByEvent(userId: number, eventId: number, req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query(`
                SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, 
                a.tematic_area, a.version, a.key_words, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)
                ), JSON_ARRAY()) AS colaborators 
                FROM tb_artigo a 
                LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id 
                LEFT JOIN tb_user u ON u.idUser = c.user_id 
                WHERE (a.creator_id = ? OR u.idUser = ?) AND a.evento_id = ?
                GROUP BY a.article_id 
                ORDER BY a.created_at DESC;`, 
                [userId, userId, eventId]
            );
            res.status(200).send(result[0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async getByStatus(status: string, req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query(`
                SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, 
                a.tematic_area, a.version, a.key_words, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)
                ), JSON_ARRAY()) AS colaborators 
                FROM tb_artigo a 
                LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id 
                LEFT JOIN tb_user u ON u.idUser = c.user_id 
                WHERE a.status = ?
                GROUP BY a.article_id 
                ORDER BY a.created_at DESC;`, 
                [status.toLowerCase()] // Garantir que o status seja em minúsculas
            );
            res.status(200).send(result[0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async getById(articleId: number, req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query(`
                SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, 
                a.tematic_area, a.version, a.key_words, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)
                ), JSON_ARRAY()) AS colaborators 
                FROM tb_artigo a 
                LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id 
                LEFT JOIN tb_user u ON u.idUser = c.user_id 
                WHERE a.article_id = ?
                GROUP BY a.article_id;`, 
                [articleId]
            );
            
            if (!result[0] || result[0].length === 0) {
                return res.status(404).json({ message: "Artigo não encontrado" });
            }
            
            res.status(200).send(result[0][0]);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async create(articleData: any, req: Request, res: Response): Promise<void> {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // Inserir o artigo
            const articleResult = await connection.query(`
                INSERT INTO tb_artigo (
                    title, creator_id, resumo, url_arquivo, key_words, 
                    tematic_area, status, version, created_at, evento_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?);`, 
                [
                    articleData.tittle,
                    articleData.creator_id,
                    articleData.resumo,
                    articleData.url_arquivo,
                    Array.isArray(articleData.key_words) ? articleData.key_words.join(',') : articleData.key_words,
                    articleData.tematic_area,
                    articleData.status || 'criado', // Usa minúsculas
                    articleData.version || 1,
                    articleData.evento_id
                ]
            );
            
            // Obter o ID do artigo inserido (auto_increment)
            const insertedArticleId = articleResult[0].insertId;
            
            // Inserir colaboradores se houver
            if (articleData.colaborators && articleData.colaborators.length > 0) {
                for (const colaborator of articleData.colaborators) {
                    await connection.query(`
                        INSERT INTO tb_colaboradores (article_id, user_id) 
                        VALUES (?, ?);`, 
                        [
                            insertedArticleId,
                            colaborator.idUser
                        ]
                    );
                }
            }
            
            await connection.commit();
            res.status(201).json({ message: "Artigo criado com sucesso", articleId: insertedArticleId });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ message: "Error: " + error });
        } finally {
            connection.release();
        }
    }

    public async update(articleId: number, articleData: any, req: Request, res: Response): Promise<void> {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // Verificar se o artigo existe
            const checkResult = await connection.query(
                `SELECT article_id FROM tb_artigo WHERE article_id = ?`, 
                [articleId]
            );
            
            if (!checkResult[0] || checkResult[0].length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: "Artigo não encontrado" });
            }
            
            // Construir a query de atualização dinamicamente
            let updateFields = [];
            let updateValues = [];
            
            if (articleData.tittle !== undefined) {
                updateFields.push("title = ?");
                updateValues.push(articleData.tittle);
            }
            
            if (articleData.resumo !== undefined) {
                updateFields.push("resumo = ?");
                updateValues.push(articleData.resumo);
            }
            
            if (articleData.url_arquivo !== undefined) {
                updateFields.push("url_arquivo = ?");
                updateValues.push(articleData.url_arquivo);
            }
            
            if (articleData.key_words !== undefined) {
                updateFields.push("key_words = ?");
                updateValues.push(Array.isArray(articleData.key_words) ? articleData.key_words.join(',') : articleData.key_words);
            }
            
            if (articleData.tematic_area !== undefined) {
                updateFields.push("tematic_area = ?");
                updateValues.push(articleData.tematic_area);
            }
            
            if (articleData.status !== undefined) {
                updateFields.push("status = ?");
                updateValues.push(articleData.status.toLowerCase()); // Garantir minúsculas
            }
            
            if (articleData.evento_id !== undefined) {
                updateFields.push("evento_id = ?");
                updateValues.push(articleData.evento_id);
            }
            
            // Sempre incrementar a versão
            updateFields.push("version = version + 1");
            
            // Adicionar o article_id no final dos valores
            updateValues.push(articleId);
            
            // Executar a atualização se houver campos para atualizar
            if (updateFields.length > 0) {
                await connection.query(
                    `UPDATE tb_artigo SET ${updateFields.join(", ")} WHERE article_id = ?`,
                    updateValues
                );
            }
            
            // Se houver colaboradores novos, atualizar colaboradores
            if (articleData.colaborators) {
                // Remover colaboradores existentes
                await connection.query(`DELETE FROM tb_colaboradores WHERE article_id = ?;`, [articleId]);
                
                // Adicionar novos colaboradores
                if (Array.isArray(articleData.colaborators) && articleData.colaborators.length > 0) {
                    for (const colaborator of articleData.colaborators) {
                        await connection.query(`
                            INSERT INTO tb_colaboradores (article_id, user_id) 
                            VALUES (?, ?);`, 
                            [
                                articleId,
                                colaborator.idUser
                            ]
                        );
                    }
                }
            }
            
            await connection.commit();
            res.status(200).json({ message: "Artigo atualizado com sucesso" });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ message: "Error: " + error });
        } finally {
            connection.release();
        }
    }

    public async delete(articleId: number, req: Request, res: Response): Promise<void> {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // Verificar se o artigo existe
            const checkResult = await connection.query(
                `SELECT article_id FROM tb_artigo WHERE article_id = ?`, 
                [articleId]
            );
            
            if (!checkResult[0] || checkResult[0].length === 0) {
                await connection.rollback();
                return res.status(404).json({ message: "Artigo não encontrado" });
            }
            
            // Remover registros de todas as tabelas relacionadas
            // Ordem de exclusão respeitando as dependências
            await connection.query(`DELETE FROM tb_comentarios WHERE article_id = ?;`, [articleId]);
            await connection.query(`DELETE FROM tb_revisao WHERE article_id = ?;`, [articleId]);
            await connection.query(`DELETE FROM tb_avaliacao WHERE article_id = ?;`, [articleId]);
            await connection.query(`DELETE FROM tb_area_tematica WHERE article_id = ?;`, [articleId]);
            await connection.query(`DELETE FROM tb_palavra_chave WHERE article_id = ?;`, [articleId]);
            await connection.query(`DELETE FROM tb_colaboradores WHERE article_id = ?;`, [articleId]);
            
            // Por fim, remover o artigo
            await connection.query(`DELETE FROM tb_artigo WHERE article_id = ?;`, [articleId]);
            
            await connection.commit();
            res.status(200).json({ message: "Artigo excluído com sucesso" });
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ message: "Error: " + error });
        } finally {
            connection.release();
        }
    }
}