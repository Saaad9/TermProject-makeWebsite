function getData() {    
    let pIndex = 1;       
    let SearchCount = 0;
        // 부모 태그 불러오기
        var GrandParentNode = document.getElementById('grandParentNode');
        var ParentNode = document.createElement('div');
        ParentNode.setAttribute('id','parentNode');
        ParentNode.setAttribute("class", "jsonppp");

        GrandParentNode.appendChild(ParentNode);
                    
        //기존 스크립트를 대체하는 코드
        var oldParentNode = document.getElementById("parentNode");
        
        //최초 한번 수행
        if (oldParentNode == null) {
            GrandParentNode.appendChild(ParentNode);
        }
        //이미 존재하는 경우 스크립트 태그를 대체하는 코드  
        else {
            GrandParentNode.replaceChild(ParentNode, oldParentNode);
        }
    
        //전체 page를 확인
        while(pIndex < 50){
            fetch('https://openapi.gg.go.kr/Animalhosptl?Key=a75947be541840e6aabbf00596dfed2a&type=json&pIndex=' + pIndex + '&pSize=50')
            .then((response) => response.json())
            .then((data) => {
                //50페이지의 정보가 모두 담겨있는 리스트
                var data_list = data['Animalhosptl'][1]['row'];

                var value_loc = document.getElementById('sel_Location');
                var selected_value = value_loc.options[value_loc.selectedIndex].text;
                
                // 부모 태그 불러오기
                var ParentNode = document.getElementById('parentNode');
                var ChildNode = document.createElement('div');
                ChildNode.setAttribute('class','child');
                ChildNode.setAttribute('id','none');
                            
                //새 스크립트를 추가하는 코드
                var ChildNode = document.createElement("div");
                ChildNode.setAttribute("id", "jsonp");
                ParentNode.appendChild(ChildNode);
                            

                let i = 1;
            
                while(i < data_list.length){
                    var SIGUN_NM = data_list[i]['SIGUN_NM'];
                    var BIZPLC_NM = data_list[i]['BIZPLC_NM'];
                    var REFINE_LOTNO_ADDR = data_list[i]['REFINE_LOTNO_ADDR'];
                    var REFINE_ROADNM_ADDR = data_list[i]['REFINE_ROADNM_ADDR'];
                    var BSN_STATE_NM = data_list[i]['BSN_STATE_NM'];
                    var tel_info = data_list[i]['LOCPLC_FACLT_TELNO'];
                    
                    //해당 페이지에서 선택한 값과 일치하는 시군명이면서 영업상태가 정상일때 출력
                    if (selected_value == SIGUN_NM && BSN_STATE_NM){
                        var CountTag = document.createElement('span');
                        var SIGUN_NM_Tag = document.createElement('span');
                        var BIZPLC_NM_Tag = document.createElement('span');
                        var REFINE_LOTNO_ADDR_Tag = document.createElement('span');
                        var REFINE_ROADNM_ADDR_Tag = document.createElement('span');
                        var tel_info_tag = document.createElement('span');
                        
                        //각 정보를 span태그로 생성
                        CountTag.setAttribute('class', 'bg-warning text-black');
                        SIGUN_NM_Tag.setAttribute('class', "SIGUN_NM");
                        BIZPLC_NM_Tag.setAttribute('class',"BIZPLC_NM");
                        REFINE_LOTNO_ADDR_Tag.setAttribute('class', "REFINE_LOTNO_ADDR");
                        REFINE_ROADNM_ADDR_Tag.setAttribute('class', "REFINE_ROADNM_ADDR");
                        tel_info_tag.setAttribute('class', "tel_info");
                        
                        //한 병원의 정보를 담을 div 태그 생성
                        Loc_Name = document.createElement('div');
                        Loc_Name.setAttribute('class', Loc_Name);
                        
                        if (tel_info == null){
                            tel_info ='없음';
                        }
                        if(REFINE_ROADNM_ADDR == null){
                            REFINE_ROADNM_ADDR = "x";
                        }
                        SearchCount++;
                        CountTag.innerHTML = SearchCount + "번<br/>";
                        SIGUN_NM_Tag.innerHTML = "도시 이름: " + SIGUN_NM + "<br/>";
                        BIZPLC_NM_Tag.innerHTML = "병원 이름: " + BIZPLC_NM + "<br/>";
                        REFINE_LOTNO_ADDR_Tag.innerHTML = "지번번호: " + REFINE_LOTNO_ADDR + "<br/>";
                        REFINE_ROADNM_ADDR_Tag.innerHTML = "도로명주소: " + REFINE_ROADNM_ADDR + "<br/>"; 
                        tel_info_tag.innerHTML = "Tel : " + tel_info + "<br/>";
                        
                        //Loc_Name에 자식으로 태그들 붙이기
                        Loc_Name.appendChild(CountTag);
                        Loc_Name.appendChild(SIGUN_NM_Tag);
                        Loc_Name.appendChild(BIZPLC_NM_Tag);
                        Loc_Name.appendChild(REFINE_LOTNO_ADDR_Tag);
                        Loc_Name.appendChild(REFINE_ROADNM_ADDR_Tag);
                        Loc_Name.appendChild(tel_info_tag);
                        
                        var pTag = document.createElement('p');
                        pTag.setAttribute('id', 'blankspace');
                        pTag.innerHTML = "<br/>";
                        Loc_Name.appendChild(pTag);

                        ChildNode.appendChild(Loc_Name);
                    }
                    i++;
                }
            });   
            pIndex++;
        }
    }