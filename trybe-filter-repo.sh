### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'publisher.sh' fornecido 
## pela Trybe. 

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path src/tests \
    --path addItem.gif \
    --path carteira.gif \
    --path btnEditar.gif \
    --path btnExcluir.gif \
    --path describe-only.png \
    --path login.gif \
    --path only-all-green.png \
    --path bonusDropdown.gif \
    --path deleteBtn.gif \
    --path editBtn.gif \
    --path only-one-green.png \
    --path test-only.png \
    --path README.md \
    --invert-paths --force