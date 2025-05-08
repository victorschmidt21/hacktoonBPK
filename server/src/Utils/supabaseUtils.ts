import supabase from '../supabaseConfig';

export const uploadImageBase64 = async (
  base64Image: string
): Promise<string> => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    const fileName = `public/pdf_as_jpg_${Date.now()}.jpg`;
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
      
    if (error) throw error;
    

    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    throw error;
  }
};

export const uploadPDFBase64 = async (
  base64PDF: string
): Promise<string> => {
  try {
    const base64Data = base64PDF.replace(/^data:application\/pdf;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
    
    const fileName = `public/pdf_as_jpg_${Date.now()}.jpg`;
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });
      
    if (error) {
      console.error("Erro detalhado:", error);
      throw error;
    }
    
    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);
      
    return urlData.publicUrl;
  } catch (error) {
    console.error("Erro no upload do PDF:", error);
    throw error;
  }
};
