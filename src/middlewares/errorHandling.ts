import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction){
    
    //verifica se o erro é uma instância da nossa classe, aí vai ser um erro interno
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message: error.message });
    };

    if(error instanceof ZodError){
        // Verifica se não foi enviado nenhum dado (body vazio)
        const issues = error.issues;
        const hasOnlyRequiredErrors = issues.every(issue => 
            issue.code === 'invalid_type' && 
            (issue as any).received === 'undefined'
        );

        if(hasOnlyRequiredErrors) {
            return res.status(400).json({
                message: "Credenciais não foram encontradas. Por favor, envie email e senha."
            });
        }

        // Extrai apenas as mensagens de erro personalizadas
        const errorMessages = issues.map(issue => issue.message);
        
        return res.status(400).json({
            message: "Erro de validação",
            errors: errorMessages
        });
    };
    

    //retorna um erro genérico se nao cair em nenhuma das cond
    return res.status(500).json({ message: error.message });
}