from pydantic import BaseModel
from typing import Any, List, Dict

class Flow(BaseModel):
    flow_id: str
    flow_name: str
    flow_json: str
    flow_type: str
    summary: str

class PDFNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class PDFNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict

class TXTNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class TXTNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict

class MDNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class MDNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict    

class HTMLNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class HTMLNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict    

class DOCXNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class DOCXNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict         

class PPTXNodeQueryRequest(BaseModel):
    query: str
    flow_id: str
    component_id: str
    node_id: str
    request_type: str

class PPTXNodeQueryResponse(BaseModel):
    id: str
    type: str
    data: dict    

class SQLComponentRequest(BaseModel):
    flow_id: str
    table_name: str

class SQLComponentResponse(BaseModel):
    component_id: str
    type: str
    message: str

class SQLNodeQueryRequest(BaseModel):
    node_id: str
    question: str
    flow_id: str
    component_id: str
    request_type: str

class SQLNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict

class CSVNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class CSVNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict

class WebNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class WebNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict

class ImgNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class ImgNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict    

class AudioNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class AudioNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict        

class YoutubeNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class YoutubeNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict      

class VideoNodeQueryRequest(BaseModel):
    node_id: str
    query: str
    flow_id: str
    component_id: str
    request_type: str

class VideoNodeQueryResponse(BaseModel):
    id: str  
    type: str
    data: dict   

class ComponentFollowUpQueryRequest(BaseModel):
    flow_id: str 
    component_id : str 
    component_type: str 
    persona_name : str
    temperature: float
    top_p : float
    instructions: str
    model_name : str

class ComponentFollowUpQueryResponse(BaseModel):
    id : str
    flow_id: str 
    position: Dict[str, int]
    data: Dict[str, str]
    type: str
 
class MultipleQuestionAnswerQueryRequest(BaseModel):
    node_id: str
    question: str
    parent_node_ids: List[str]
    flow_id: str

class MultipleQuestionAnswerQueryResponse(BaseModel):
    id: str
    type: str
    parent_node_ids: List[str]
    data: dict

class FlowSummarizeRequest(BaseModel):
    flow_id: str  

class FlowSummarizeResponse(BaseModel):
    flow_id: str      
    response: str
