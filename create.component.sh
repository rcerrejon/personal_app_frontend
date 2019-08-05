#!/usr/bin/env bash

# filename: create.component.sh
echo "Enter name of the React Component:"
read name
echo "Functional or Class component? (f/c)"
read componentType

if [ -d src/components/$name ];
then
    echo "Component already exists!"
else
    if [[ $componentType == 'f' ]];
    then
        mkdir src/components/$name
        touch src/components/$name/index.jsx
        touch src/components/$name/style.scss

        echo -e "import React from 'react';
        import './style.scss';

        function $name() {
            return (
                <div className='$name-container'>
                    $name
                </div>
            );
        }

        export default $name;
        " >> src/components/$name/index.jsx

        echo -e ".$name-container{

        }
        " >> src/components/$name/style.scss
        echo "| functional component |"

        echo " ------------------------------------------------ "
        echo "| Component '$name' is created with all files!   |"
        echo " ------------------------------------------------ "
    elif [[ $componentType == 'c' ]];
    then
        mkdir src/components/$name
        touch src/components/$name/index.jsx
        touch src/components/$name/style.scss

        echo -e "import React from 'react';
        import propTypes from 'prop-types'
        import './style.scss';

        class $name extends React.Component{
            constructor(props){
                super(props)
                this.state = {

                }
            }

            componentDidMount() {

            }

            componentWillUnmount() {

            }

            render() {
                return(
                    <div className='$name-container'>
                        $name
                    </div>
                )
            }
        }

        $name.propTypes = {  };
        export default $name;">> src/components/$name/index.jsx

        echo -e ".$name-container{

        }" >> src/components/$name/style.scss

        echo "| class component |"
        echo " ------------------------------------------------ "
        echo "| Component '$name' is created with all files!   |"
        echo " ------------------------------------------------ "

    else

        echo "INCORRECT INPUT, TRY AGAIN"
    fi
fi
