import ClientInstance from "../../../instance/ClientInstance"
import Server from "../Server"

export default class File {
    public name: string
    public mode: string
    public mode_bits: string
    public size: number
    public is_file: boolean
    public is_symlink: boolean
    public mimetype: string
    public created_at: string
    public modified_at: string

    private _path: string
    private _pathw: string

    public raw: any

    constructor(private instance: ClientInstance, data: any, _path: string, public _parentServer: Server) {
        const attributes = data.attributes
        this.name = attributes.name
        this.mode = attributes.mode
        this.mode_bits = attributes.mode_bits
        this.size = attributes.size
        this.is_file = attributes.is_file
        this.is_symlink = attributes.is_symlink
        this.mimetype = attributes.mimetype
        this.created_at = attributes.created_at
        this.modified_at = attributes.modified_at

        this._path = _path.replace(/%2F/g, "/")
        this._pathw = this._path + this.name

        this.raw = attributes
    }

    retrieveContents(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.instance.call({ endpoint: `servers/${this._parentServer.identifier}/files/contents?file=${this._pathw.replace(/\//g, "%2F")}` })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    retrieveDownloadLink(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    (
                        await this.instance.call({
                            endpoint: `servers/${this._parentServer.identifier}/files/download?file=${this._pathw.replace(/\//g, "%2F")}`,
                        })
                    ).attributes.url
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    rename(newName: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.instance.call({
                        endpoint: `servers/${this._parentServer.identifier}/files/rename`,
                        body: {
                            root: this._path,
                            files: [
                                {
                                    from: this.name,
                                    to: newName,
                                },
                            ],
                        },
                        method: "PUT",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    copy() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.instance.call({
                        endpoint: `servers/${this._parentServer.identifier}/files/copy`,
                        body: {
                            location: this._pathw,
                        },
                        method: "PUT",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    write(data: any) {
        return new Promise(async (resolve, reject) => {
            if (!this.is_file) {
                reject(new Error("Cannot write to a directory"))
            }
            try {
                resolve(
                    await this.instance.call({
                        endpoint: `servers/${this._parentServer.identifier}/files/write?file=${this._pathw.replace(/\//g, "%2F")}`,
                        body: data,
                        method: "POST",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    compress(): Promise<File> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new File(
                        this.instance,
                        await this.instance.call({
                            endpoint: `servers/${this._parentServer.identifier}/files/compress`,
                            body: {
                                root: this._path,
                                files: [this.name],
                            },
                            method: "PUT",
                        }),
                        this._path,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    decompress() {
        return new Promise(async (resolve, reject) => {
            if (this.mimetype != "application/tar+gzip") {
                reject(new Error("File is not an archive!"))
            }
            try {
                resolve(
                    await this.instance.call({
                        endpoint: `servers/${this._parentServer.identifier}/files/decompress`,
                        body: {
                            root: this._path,
                            file: this.name,
                        },
                        method: "PUT",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this.instance.call({
                        endpoint: `servers/${this._parentServer.identifier}/files/delete`,
                        body: {
                            root: this._path,
                            files: [this.name],
                        },
                        method: "POST",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
