package com.cerberos.colorpool.controller.pdf;

import com.cerberos.colorpool.model.pdf.PdfModel;
import com.cerberos.colorpool.model.response.SingleResult;
import com.cerberos.colorpool.service.ResponseService;
import com.cerberos.colorpool.service.image.ImageService;
import com.cerberos.colorpool.service.pdf.PdfService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class PdfController {
    private final PdfService pdfService;
    private final ResponseService responseService;

    @Operation(summary = "마크다운 및 pdf저장", description = "사용자가 작성한 마크다운의 내용을 저장하고 이를 pdf로 변환하여 저장한 후 pdf저장 경로를 반환합니다.")
    @PostMapping("/pdf")
    public SingleResult<PdfModel.Res> uploadPdf(@RequestBody PdfModel.Req pdfModel){
        return responseService.getSingleResult(pdfService.uploadPdfAndMarkdown(pdfModel));
    }
    @Operation(summary = "pdf html내용 단건 조회", description = "pdf의 id로 pdf html내용을 단건 조회합니다.")
    @GetMapping("/contents/{id}")
    public SingleResult<String> getOneContents(@PathVariable int id){
        return responseService.getSingleResult(pdfService.getOneContents(id));
    }
}
