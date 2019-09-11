import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function FileDrop() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0].size, acceptedFiles[0].type);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}
