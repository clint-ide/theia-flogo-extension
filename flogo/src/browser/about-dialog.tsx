import {inject, injectable} from 'inversify';
import {ApplicationServer} from "@theia/core/lib/common/application-protocol";
import {AboutDialog} from "@theia/core/lib/browser/about-dialog";
import * as React from "react";

export const ABOUT_CONTENT_CLASS = 'theia-aboutDialog';
export const ABOUT_EXTENSIONS_CLASS = 'theia-aboutExtensions';

@injectable()
export class ClintAboutDialog extends AboutDialog {

    protected readonly okButton: HTMLButtonElement;

    @inject(ApplicationServer)
    protected readonly appServer: ApplicationServer;

    constructor(
    ) {
        super({
            title: "About Clint IDE"
        });
    }

    protected render(): React.ReactNode {
        return <div className={ABOUT_CONTENT_CLASS}>
            <img src="https://avatars0.githubusercontent.com/u/48998128?s=128" style={{ float: 'right', paddingLeft: '10px' }} />
            {this.renderHeader()}
            {this.renderExtensions()}
        </div>;
    }

}
