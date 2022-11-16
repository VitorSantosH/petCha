import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import conect from "../../../../../services/conect";


// imgs
import addCirculo from "../../../../../assets/add-circle.png";


const useUploadState = (props) => {

    const [uploadState, setUploadState] = useState({
        files: [],
        imgCapa: []
    })
    
    useEffect(() => {

        props.setImgs(uploadState.imgCapa, uploadState.files)

    }, [uploadState.imgCapa, uploadState.imgs])


    function uploadImage(event) {

        /*    if (event.target.files[0].size < 2097152) {
    
    
    
                const responseStatus = await conect.uploadImage(event.target.files[0], props.codStore)
    
                if (responseStatus == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Upload realizado com sucesso'
                    });
                    props.updateStore(props.codStore)
    
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro inesperado'
                    });
                }
                event.target.value = "";
    
            } else {
    
                Swal.fire({
                    icon: 'error',
                    title: 'Imagem maior que o permitido, escolha uma imagem com no máximo 2 mb.'
                });
                event.target.value = "";
    
            }
            */

        if(uploadState.files.length > 4 ) return Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: "Você já alcansou número maximo de imagens"
        })

        const files = uploadState.files;
        const newFile = {
            file: event.target.files[0],
            preview: (URL.createObjectURL(event.target.files[0])),
            name: event.target.files[0].name
        }

        files.push(newFile);

        return setUploadState({
            ...uploadState,
            files: files
        })


    }

    function uploadImageCapa(event) {


        


        const newFile = {
            file: event.target.files[0],
            preview: (URL.createObjectURL(event.target.files[0])),
            name: event.target.files[0].name
        }



        return setUploadState({
            ...uploadState,
            imgCapa: [newFile]
        })


    }

    function GeneratePreviewImg(files) {


        const previewImg = files.map((file, index) => {

            return (
                <div
                    className="previewImgContainer"
                    key={file.size + file.name}
                >

                    <img
                        src={file.preview}
                        className='imgPreview'
                        alt="" />

                    <i
                        className="fa fa-trash"
                        onClick={e => removeFile(index)}

                    ></i>



                </div>
            )

        })

        return (
            previewImg
        )

    }
    function GeneratePreviewImgCapa(files) {

        function removeFileImgCapa(index) {

            let newFiles = uploadState.imgCapa
    
            try {
    
                newFiles.splice(index, 1)
    
            } catch (error) {
    
            }
    
            return setUploadState({
                ...uploadState,
                imgCapa: newFiles
            })
    
    
        }

        const previewImg = files.map((file, index) => {

            return (
                <div
                    className="previewImgContainer"
                    key={file.size + file.name}
                >

                    <img
                        src={file.preview}
                        className='imgPreview'
                        alt="" />

                    <i
                        className="fa fa-trash"
                        onClick={e => removeFileImgCapa(index)}

                    ></i>



                </div>
            )

        })

        return (
            previewImg
        )

    }

    function removeFile(index) {

        let newFiles = uploadState.files

        try {

            newFiles.splice(index, 1)

        } catch (error) {

        }

        return setUploadState({
            ...uploadState,
            files: newFiles
        })


    }


    return {
        uploadState,
        uploadImage,
        GeneratePreviewImg,
        uploadImageCapa,
        GeneratePreviewImgCapa

    }

}



const UploadImgs = (props) => {


    const {
        uploadState,
        uploadImage,
        GeneratePreviewImg,
        uploadImageCapa,
        GeneratePreviewImgCapa



    } = useUploadState(props)




    return (
        <>
            <div className="addImgsCadLoja">


                <div className="addImgsCadPart1">


                    <div className="imgCap">
                        <span>
                            Foto de capa
                        </span>

                        {!uploadState.imgCapa[0] && (
                            <div className="adicionarFoto">

                                <label htmlFor="uploadImageInputCapa" className="labelUploadImageInput">

                                    <img src={addCirculo} alt="" />

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        id="uploadImageInputCapa"
                                        className="uploadImageInput"
                                        onChange={event => {
                                            uploadImageCapa(event)
                                        }}
                                        placeholder=""
                                    />
                                    <span>
                                        Adicionar Foto
                                    </span>
                                </label>




                            </div>

                        )}

                        {uploadState.imgCapa[0] && (
                            GeneratePreviewImgCapa(uploadState.imgCapa)
                        )}
                    </div>


                </div>




                <div className="addImgsCadPart2">

                    <span>Fotos carrossel</span>
                    <div className="containerPart2">

                        {GeneratePreviewImg(uploadState.files)}

                        <div className="imgsCarrossel">



                            <div className="adicionarFoto">

                                <label htmlFor="uploadImageInput" id="labelUploadImageInput">

                                    <img src={addCirculo} alt="" />

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        id="uploadImageInput"
                                        onChange={event => {
                                                                        uploadImage(event)
                                        }}
                                        placeholder=""
                                    />
                                    <span>
                                        Adicionar Foto
                                    </span>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </>
    )
}


export default UploadImgs;