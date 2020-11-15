<#ftl >
<#import "parts/common.ftl" as c>
<#import "parts/loginparts.ftl" as l>
<#include "parts/security.ftl">
<@c.page>
    <#if isAdmin>
    <div>
        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Add new Document
        </a>
        <div class="collapse <#if document??>show</#if>" id="collapseExample">
            <div class="form-group mt-3">
                <form method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <input type="text" class="form-control ${(titleError??)?string('is-invalid', '')}"
                               value="<#if document??>${document.title}</#if>" name="title" placeholder="Введите название документа" />
                        <#if titleError??>
                            <div class="invalid-feedback">
                                ${titleError}
                            </div>
                        </#if>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control ${(descriptionError??)?string('is-invalid', '')}" name="description"
                               value="<#if document??>${document.description}</#if>"
                               placeholder="Введите описание документа">

                        <#if descriptionError??>
                            <div class="invalid-feedback">
                                ${descriptionError}
                            </div>
                        </#if>
                    </div>
                    <div class="form-group">
                        <div class="custom-file">
                            <input type="file" name="file" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <input type="hidden" name="_csrf" value="${_csrf.token}" />
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </#if>
    <div>Список документов</div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <form method="get" action="/main" class="form-inline">
                <input type="text" name="filter" class="form-control" value="${filter?ifExists}" placeholder="Search by tag">
                <button type="submit" class="btn btn-primary ml-2">Search</button>
            </form>
        </div>
    </div>

        <div class="card-columns">
            <#list documents as document>
                <div class="card my-3">

                    <#if document.filename??>
                        <a class="btn btn-primary stretched-link" href="/docs/${document.filename}" download>Скачать файл</a>
                    </#if>
                    <div class="m-2"  >
                        <h2> ${document.title}</h2>

                    </div>
                    <div class="m-2">
                        <p style="font-weight: lighter"> ${document.description}</p>
                    </div>
                    <div class="m-2">
                        <a  href="/comments/${document.id}">Комментарии</a>
                    </div>

                </div>
            <#else>
                No Documents
            </#list>
        </div>
</@c.page>